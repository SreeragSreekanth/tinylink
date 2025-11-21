// src/pages/Stats.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLinkStats } from "../api";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getLinkStats(code);
        setLink(data);
      } catch (err) {
        setError("Link not found or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading link statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-red-800">Unable to load stats</h3>
          <p className="mt-2 text-red-600">{error}</p>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const shortUrl = `${BASE_URL}/${code}`;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Link Statistics</h1>
          <p className="text-gray-600 mt-1">Tracking performance for your shortened URL</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-mono font-medium">
          {code}
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Short URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short URL</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-gray-700"
                value={shortUrl}
                readOnly
              />
              <button
                onClick={() => copyToClipboard(shortUrl)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target URL</label>
            <a
              href={link.target}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors break-all text-blue-600 hover:text-blue-700"
            >
              {link.target}
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{link.clicks}</div>
              <div className="text-sm text-gray-600 mt-1">Total Clicks</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-gray-900">
                {new Date(link.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Created Date</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-gray-900">
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleDateString()
                  : <span className="text-gray-400">Never</span>}
              </div>
              <div className="text-sm text-gray-600 mt-1">Last Clicked</div>
            </div>
          </div>

          {/* Detailed Dates */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Creation Details</h4>
                <p className="text-gray-600">
                  {new Date(link.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Last Activity</h4>
                <p className="text-gray-600">
                  {link.last_clicked
                    ? new Date(link.last_clicked).toLocaleString()
                    : 'No clicks yet'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}