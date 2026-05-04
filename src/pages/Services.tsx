import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, FileText, DollarSign, Shield, ArrowLeftRight, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: <Search className="h-10 w-10 text-rugike-accent" />,
    title: "Car Inspection",
    description: "Every vehicle listed on RUGIKE Motors goes through a thorough multi-point inspection process. Our certified inspectors check engine performance, chassis integrity, electrical systems, and more — so you know exactly what you're getting before you buy.",
    features: [
      "150-point mechanical inspection",
      "Engine and transmission check",
      "Body and paint assessment",
      "Electrical systems test",
      "Certified inspection report provided",
    ],
  },
  {
    icon: <FileText className="h-10 w-10 text-rugike-accent" />,
    title: "Vehicle History",
    description: "We provide full vehicle history reports for every listed car. Know the ownership history, accident records, service history, and mileage verification before making your decision.",
    features: [
      "Full ownership history",
      "Accident and damage records",
      "Service and maintenance log",
      "Mileage verification",
      "Import and registration history",
    ],
  },
  {
    icon: <DollarSign className="h-10 w-10 text-rugike-accent" />,
    title: "Financing Options",
    description: "We partner with trusted financial institutions across Kenya to offer flexible car financing plans tailored to your budget. Whether you need a short-term or long-term loan, we'll help you find the right fit.",
    features: [
      "Flexible repayment periods",
      "Competitive interest rates",
      "Fast loan approval process",
      "Low deposit options available",
      "Partnership with leading Kenyan banks",
    ],
  },
  {
    icon: <Shield className="h-10 w-10 text-rugike-accent" />,
    title: "Insurance",
    description: "Drive with confidence. We connect buyers with reputable insurance providers to ensure your new vehicle is covered from day one. Get comprehensive or third-party cover options instantly.",
    features: [
      "Comprehensive insurance options",
      "Third-party cover available",
      "Same-day cover activation",
      "Partnered with top Kenyan insurers",
      "Renewal reminders and support",
    ],
  },
  {
    icon: <ArrowLeftRight className="h-10 w-10 text-rugike-accent" />,
    title: "Trade-In",
    description: "Looking to upgrade? Bring in your current vehicle and trade it in towards your next purchase. Our team will assess your car's value fairly and apply it directly to your new buy.",
    features: [
      "Free trade-in valuation",
      "Instant offer on your vehicle",
      "Value applied to new purchase",
      "Any make or model accepted",
      "Hassle-free paperwork handled for you",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main>
        {/* Header */}
        <div className="bg-rugike-primary text-white py-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-rugike-secondary text-lg max-w-2xl mx-auto">
              Everything you need to buy, sell, and own a car with confidence — all under one roof.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl text-rugike-primary">{service.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-rugike-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-rugike-primary rounded-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-rugike-secondary text-lg mb-8 max-w-xl mx-auto">
              Browse our verified listings or reach out to our team to learn more about any of our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90" asChild>
                <Link to="/cars">
                  Browse Cars <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;