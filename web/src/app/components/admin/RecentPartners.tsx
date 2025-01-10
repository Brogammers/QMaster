'use client'

export default function RecentPartners() {
  const partners = [
    { id: 1, name: 'City Hospital', category: 'Healthcare', status: 'active' },
    { id: 2, name: 'Bank of Trust', category: 'Banking', status: 'pending' },
    { id: 3, name: 'Tech University', category: 'Education', status: 'active' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Partners</h3>
      <div className="space-y-4">
        {partners.map((partner) => (
          <div key={partner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">{partner.name}</h4>
              <p className="text-sm text-gray-500">{partner.category}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              partner.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
            }`}>
              {partner.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 