// src/components/CreateLinkForm.jsx
import { useState } from "react";
import { createLink } from "../api";

export default function CreateLinkForm({ onCreated }) {
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const CODE_RE = /^[A-Za-z0-9]{6,8}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate URL format
    if (!target.trim().startsWith("http://") && !target.trim().startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    // Validate URL is valid
    try {
      new URL(target.trim());
    } catch (err) {
      setError("Please enter a valid URL");
      return;
    }

    // Validate custom code if provided
    if (code && !CODE_RE.test(code)) {
      setError("Custom code must be 6–8 characters (letters and numbers only)");
      return;
    }

    try {
      setLoading(true);
      await createLink({ target: target.trim(), code: code || undefined });
      setSuccess("Link created successfully! You can now use your shortened URL.");
      setTarget("");
      setCode("");

      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message || "Failed to create link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-gray-900">Create New Short Link</h2>
        <p className="text-gray-600 mt-1">Shorten long URLs to make them easier to share</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Target URL Input */}
      <div>
        <label htmlFor="target" className="block text-sm font-semibold text-gray-700 mb-2">
          Destination URL *
        </label>
        <input
          id="target"
          type="url"
          placeholder="https://example.com/very-long-url-path"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
      </div>

      {/* Custom Code Input */}
      <div>
        <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
          Custom Code (optional)
        </label>
        <input
          id="code"
          type="text"
          placeholder="my-link-123"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500">
          6–8 characters, letters and numbers only. Leave blank for auto-generated code.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Creating Link...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Create Short Link
          </>
        )}
      </button>
    </form>
  );
}