import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    gender: {
      boys: { teams: [], unassigned: [] },
      girls: { teams: [], unassigned: [] }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In production this would fetch from our API
        const demoData = {
          gender: {
            boys: {
              teams: [
                { name: "Boys U10 Thunder", players: ["John D.", "Mike S."] },
                { name: "Boys U10 Lightning", players: ["Tom R.", "Sam B."] }
              ],
              unassigned: ["Alex M.", "Chris P."]
            },
            girls: {
              teams: [
                { name: "Girls U10 Diamonds", players: ["Sarah L.", "Emma K."] }
              ],
              unassigned: ["Lisa R."]
            }
          }
        };
        setData(demoData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4">
      Error loading data: {error}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Futsal Registration Dashboard</h1>
      
      <Tabs defaultValue="boys" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="boys" className="flex-1">Boys Teams</TabsTrigger>
          <TabsTrigger value="girls" className="flex-1">Girls Teams</TabsTrigger>
        </TabsList>

        {['boys', 'girls'].map(gender => (
          <TabsContent key={gender} value={gender}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.gender[gender].teams.map((team, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="font-semibold text-base">{team.name}</h3>
                      <ul className="mt-2 space-y-1">
                        {team.players.map((player, pidx) => (
                          <li key={pidx} className="pl-4">{player}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Players Needing Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {data.gender[gender].unassigned.map((player, idx) => (
                      <li key={idx} className="pl-4">{player}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}