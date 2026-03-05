import React from 'react'

function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
      <p className="text-xs">
        © {new Date().getFullYear()} StudentMS. All rights reserved.
      </p>
      <div className="flex items-center gap-6">
        <a href="#" className="text-xs hover:text-indigo-400 transition-colors">Privacy Policy</a>
        <a href="#" className="text-xs hover:text-indigo-400 transition-colors">Terms of Service</a>
        <a href="#" className="text-xs hover:text-indigo-400 transition-colors">Contact</a>
      </div>
    </div>
  )
}

export default Footer
