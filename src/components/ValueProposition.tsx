
import { Card, CardContent } from "@/components/ui/card";
import { CarFront, ShoppingBag, ArrowRight, ArrowDown } from "lucide-react";

const ValueProposition = () => {
  const features = [
    {
      icon: <CarFront className="h-8 w-8 text-rugike-accent" />,
      title: "Curated Vehicle Selection",
      description: "We offer a carefully curated selection of quality vehicles ranging from everyday rides to high-performance models."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-rugike-accent" />,
      title: "Streamlined Experience",
      description: "Our investor-backed platform delivers a modern, hassle-free car buying experience from search to purchase."
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-rugike-accent" />,
      title: "Verified Quality",
      description: "Every vehicle undergoes thorough inspection and verification to ensure transparency and confidence."
    }
  ];

  return (
    <section className="py-20 bg-rugike-primary text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose RUGIKE Motors</h2>
          <p className="text-rugike-secondary text-lg max-w-2xl mx-auto">
            Our mission is to modernize the car buying experience through innovation, 
            integrity, and investor-backed growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-rugike-dark border-0 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-5px]">
              <CardContent className="p-8">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-rugike-secondary">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="text-rugike-accent font-medium mb-2">Discover More</span>
            <ArrowDown className="h-6 w-6 text-rugike-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
