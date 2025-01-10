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
        ? 'bg-slate-800/50 shadow-xl shadow-black/10 ring-1 ring-white/10' 
        : 'bg-white shadow-xl shadow-black/5 ring-1 ring-black/5'}`}
    >
      <h3 className={`text-lg font-semibold mb-4 
        ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Recent Partners
      </h3>
      <div className="space-y-4">
        {partners.map((partner) => (
          <div key={partner.id} className={`flex items-center justify-between p-3 rounded-lg
            ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {partner.name}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {partner.category}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              partner.status === 'active' 
                ? 'bg-emerald-400/10 text-emerald-400' 
                : 'bg-amber-400/10 text-amber-400'
            }`}>
              {partner.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 