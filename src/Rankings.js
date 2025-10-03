import { useState, useEffect } from 'react';

function Rankings() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('/data/Governors.json')
      .then(res => res.json())
      .then(json => {
        const ranked = [...json].sort((a, b) => {
          if (b.approvalPercent !== a.approvalPercent)
            return b.approvalPercent - a.approvalPercent;
          if (a.disapprovalPercent !== b.disapprovalPercent)
            return a.disapprovalPercent - b.disapprovalPercent;
          return a.dkPercent - b.dkPercent;
        });
        setData(ranked);
      });
  }, []);

  const top10 = data.slice(0, 10);
  const bottom10 = data.slice(-10);

  const renderCard = (item, i) => (
    <div
      key={i}
      className={`p-3 mb-2 rounded shadow flex items-center ${
        i < 10 ? 'bg-green-100' : i >= data.length - 10 ? 'bg-red-100' : 'bg-white'
      }`}
    >
      <img
        src={item.photoUrl || '/default-avatar.png'}
        alt={item.name}
        className="w-12 h-12 rounded-full object-cover mr-3"
      />
      <div>
        <div className="font-bold text-lg">#{i + 1} {item.name}</div>
        <div className="text-sm text-gray-700">{item.state} • {item.party}</div>
        <div className="text-sm mt-1">
          👍 {item.approvalPercent}% • 👎 {item.disapprovalPercent}% • ❔ {item.dkPercent}%
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Top 10 Governors</h2>
      {top10.map((item, i) => renderCard(item, i))}

      <h2 className="text-xl font-bold mt-6 mb-4">Bottom 10 Governors</h2>
      {bottom10.map((item, i) => renderCard(item, data.length - 10 + i))}

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-6 px-4 py-2 bg-blue-900 text-white rounded"
        >
          Expand Full Rankings
        </button>
      )}

      {expanded && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Full Rankings</h2>
          {data.map((item, i) => renderCard(item, i))}
        </div>
      )}
    </div>
  );
}

export default Rankings;
