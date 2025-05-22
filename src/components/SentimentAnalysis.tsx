
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

// Improved data structure based on database schema suggestions
interface SentimentData {
  name: string;
  value: number;
  color: string;
}

interface TopicSentiment {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
}

interface FeedbackItem {
  id: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  source: "review" | "message" | "feedback";
  createdAt: string;
  userId?: string;
}

const SentimentAnalysis = () => {
  // Sample sentiment data with improved structure
  const sentimentData: SentimentData[] = [
    { name: "Positive", value: 68, color: "#4ade80" },
    { name: "Neutral", value: 22, color: "#94a3b8" },
    { name: "Negative", value: 10, color: "#f87171" },
  ];

  const topicsData: TopicSentiment[] = [
    { name: "Car Quality", positive: 82, neutral: 12, negative: 6 },
    { name: "Price", positive: 65, neutral: 20, negative: 15 },
    { name: "Customer Service", positive: 75, neutral: 15, negative: 10 },
    { name: "Website UX", positive: 58, neutral: 32, negative: 10 },
    { name: "Delivery", positive: 70, neutral: 20, negative: 10 },
  ];

  const recentFeedback: FeedbackItem[] = [
    { 
      id: "1", 
      text: "The car was delivered in perfect condition. Great service!", 
      sentiment: "positive",
      source: "review",
      createdAt: "2025-05-15T10:30:00Z"
    },
    { 
      id: "2", 
      text: "Website was easy to navigate, but checkout could be improved.", 
      sentiment: "neutral",
      source: "feedback",
      createdAt: "2025-05-14T15:20:00Z"
    },
    { 
      id: "3", 
      text: "Car prices seem reasonable compared to other dealerships.", 
      sentiment: "positive",
      source: "message",
      createdAt: "2025-05-13T09:45:00Z"
    },
    { 
      id: "4", 
      text: "Had to wait too long for a response to my inquiry.", 
      sentiment: "negative",
      source: "message",
      createdAt: "2025-05-12T14:10:00Z"
    },
    { 
      id: "5", 
      text: "Great selection of luxury vehicles. Found exactly what I wanted.", 
      sentiment: "positive",
      source: "review",
      createdAt: "2025-05-11T11:25:00Z"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Sentiment</CardTitle>
            <CardDescription>
              Customer feedback sentiment analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sentiment by Topic</CardTitle>
            <CardDescription>
              Breakdown of sentiment across key topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="#4ade80" name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill="#f87171" name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>
            Latest customer comments with sentiment analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className={`w-3 h-3 mt-1.5 rounded-full ${
                  feedback.sentiment === 'positive' ? 'bg-green-500' : 
                  feedback.sentiment === 'neutral' ? 'bg-gray-400' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{feedback.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Sentiment: <span className={`font-medium ${
                        feedback.sentiment === 'positive' ? 'text-green-600' : 
                        feedback.sentiment === 'neutral' ? 'text-gray-600' : 'text-red-600'
                      }`}>{feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}</span>
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {feedback.source}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
