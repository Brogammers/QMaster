'use client'

export default function RecentPartners({ isDarkMode }: { isDarkMode?: boolean }) {
  const partners = [
    { id: 1, name: 'City Hospital', category: 'Healthcare', status: 'active' },
    { id: 2, name: 'Bank of Trust', category: 'Banking', status: 'pending' },
    { id: 3, name: 'Tech University', category: 'Education', status: 'active' },
  ];

  return (
    <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300
      ${isDarkMode 
        ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]' 
        : 'bg-white shadow-xl shadow-black/5 ring-1 ring-black/5'}`}
    >
      <h3 className={`text-lg font-semibold mb-4 
        ${isDarkMode ? 'text-white/90' : 'text-slate-900'}`}>
        Recent Partners
      </h3>
      <div className="space-y-4">
        {partners.map((partner) => (
          <div key={partner.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors
            ${isDarkMode ? 'bg-white/[0.03] hover:bg-white/[0.05]' : 'bg-gray-50'}`}>
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white/90' : 'text-slate-900'}`}>
                {partner.name}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
                {partner.category}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              partner.status === 'active' 
                ? isDarkMode 
                  ? 'bg-emerald-500/10 text-emerald-300' 
                  : 'bg-emerald-400/10 text-emerald-600'
                : isDarkMode
                  ? 'bg-amber-500/10 text-amber-300'
                  : 'bg-amber-400/10 text-amber-600'
            }`}>
              {partner.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 