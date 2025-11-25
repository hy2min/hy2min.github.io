export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-10 mt-16" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Hyemin. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            href="mailto:hy1x1mn@gmail.com"
          >
            Email
          </a>
          <a
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            href="https://github.com/hy2min" target="_blank" rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            href="https://linkedin.com/in/hy2min" target="_blank" rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

