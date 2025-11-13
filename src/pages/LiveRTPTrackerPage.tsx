import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

const RTP_DATA = [
  { operator: 'Stake', game: 'Wanted Dead or a Wild', spins: '1.2M', stated: 96.38, live: 96.51, trend: 'up' },
  { operator: 'Duel', game: 'Duel Dice', spins: '850K', stated: 100.0, live: 99.98, trend: 'stable' },
  { operator: 'Rollbit', game: 'Book of Shadows', spins: '620K', stated: 96.01, live: 95.89, trend: 'down' },
  { operator: 'BC.Game', game: 'Gates of Olympus', spins: '2.1M', stated: 96.5, live: 96.62, trend: 'up' },
];

export const LiveRTPTrackerPage = () => {
  return (
    <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <Icons.Activity className="h-8 w-8 text-[#00FFC0] animate-pulse" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Live RTP Feed</h1>
        </div>
        <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">// STATUS: REAL-TIME DATA STREAM // AGGREGATED FROM 10M+ SPINS</p>
      </div>

      <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#14131c] border-b border-[#333]">
              <tr>
                <th className="p-4 pl-6 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider">Operator / Game</th>
                <th className="p-4 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider text-center">Spin Volume</th>
                <th className="p-4 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider text-center">Stated RTP</th>
                <th className="p-4 font-heading text-xs text-[#00FFC0] uppercase tracking-wider text-center">Live RTP (ZAP Verified)</th>
                <th className="p-4 pr-6 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider text-center">Trend (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {RTP_DATA.map((item) => (
                <tr key={item.game} className="hover:bg-[#14131c] transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-white">{item.game}</div>
                    <div className="text-xs text-[#8d8c9e]">{item.operator}</div>
                  </td>
                  <td className="p-4 text-center font-mono text-[#8d8c9e]">{item.spins}</td>
                  <td className="p-4 text-center font-mono text-white">{item.stated.toFixed(2)}%</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`font-mono text-lg font-bold ${item.live >= item.stated ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>{item.live.toFixed(2)}%</span>
                    </div>
                  </td>
                   <td className="p-4 pr-6 text-center">
                    {item.trend === 'up' && <Icons.TrendingUp className="h-5 w-5 text-[#00FFC0] mx-auto" />}
                    {item.trend === 'down' && <Icons.ArrowDown className="h-5 w-5 text-red-500 mx-auto" />}
                    {item.trend === 'stable' && <Icons.ChevronRight className="h-5 w-5 text-[#8d8c9e] mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
