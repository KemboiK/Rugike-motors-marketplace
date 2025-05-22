
import AdminNavigation from "@/components/AdminNavigation";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import Chatbot from "@/components/Chatbot";

const SentimentAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation />
      
      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Sentiment Analysis</h1>
        <SentimentAnalysis />
      </main>
      
      <Chatbot variant="admin" />
    </div>
  );
};

export default SentimentAnalysisPage;
