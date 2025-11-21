// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { listLinks, deleteLink } from "../api";
import { Link } from "react-router-dom";
import CreateLinkForm from "../components/CreateLinkForm";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(null);

  // Load links from backend
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listLinks();
        setLinks(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to load links:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  // Search filter
  useEffect(() => {
    const s = search.toLowerCase().trim();
    const results = links.filter(
      (l) =>
        l.code.toLowerCase().includes(s) ||
        l.target.toLowerCase().includes(s)
    );
    setFiltered(results);
  }, [search, links]);

  // Copy URL with feedback
  const handleCopy = async (code) => {
    const url = `${import.meta.env.VITE_API_BASE || "http://localhost:3000"}/${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(code);
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Delete handler
  async function handleDelete(code) {
    if (!confirm(`Are you sure you want to delete "${code}"? This action cannot be undone.`)) return;

    try {
      await deleteLink(code);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete link. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">TinyLink Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your shortened URLs</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
          {filtered.length} {filtered.length === 1 ? 'link' : 'links'}
        </div>
      </div>

      {/* Create Link Form */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
        <CreateLinkForm onCreated={() => setRefresh(!refresh)} />
      </div>

      {/* Search & Controls */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by code or target URL..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content States */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading your links...</p>
          </div>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No links found</h3>
          <p className="mt-2 text-gray-600 max-w-sm mx-auto">
            {search ? 'Try adjusting your search terms' : 'Get started by creating your first shortened URL'}
          </p>
        </div>
      )}

      {/* Links Table */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Short Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Target URL</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Clicked</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((link) => (
                  <tr key={link.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/code/${link.code}`}
                          className="font-mono text-blue-600 hover:text-blue-700 hover:underline font-medium"
                        >
                          {link.code}
                        </Link>
                        <button
                          onClick={() => handleCopy(link.code)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          {copyFeedback === link.code ? (
                            <>
                              <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] 2xl:max-w-[300px]">
                      <a
                        href={link.target}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 underline truncate block"
                        title={link.target}
                      >
                        {link.target}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {link.clicks}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {link.last_clicked
                        ? new Date(link.last_clicked).toLocaleDateString() + ' ' + new Date(link.last_clicked).toLocaleTimeString()
                        : <span className="text-gray-400">Never</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/code/${link.code}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Stats
                        </Link>
                        <button
                          onClick={() => handleDelete(link.code)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}