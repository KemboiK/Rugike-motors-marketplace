
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Phone, MessageSquare, Mail } from "lucide-react";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form to a backend API
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rugike-primary mb-4">Contact Us</h1>
            <p className="text-rugike-secondary text-lg max-w-2xl mx-auto">
              Have questions about a specific vehicle or our services? Reach out to the RUGIKE Motors team through any of our contact channels below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-rugike-light rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-rugike-primary" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Our team is available Mon-Fri, 9am-6pm</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium text-rugike-primary">+1 (555) 123-4567</p>
                <Button variant="link" className="text-rugike-accent mt-2">
                  Call Now
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-rugike-light rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-rugike-primary" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>We'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium text-rugike-primary">info@rugikemotors.com</p>
                <Button variant="link" className="text-rugike-accent mt-2">
                  Send Email
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-rugike-light rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-rugike-primary" />
                </div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with our team in real-time</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium text-rugike-primary">Available 24/7</p>
                <Button variant="link" className="text-rugike-accent mt-2">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                  <CardDescription>
                    Follow us on social media to stay updated with our latest inventory and promotions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-[#E1306C] rounded-full p-2 mr-4">
                        <Instagram className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Instagram</h3>
                        <p className="text-rugike-secondary text-sm">@rugikemotors</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-[#1DA1F2] rounded-full p-2 mr-4">
                        <Twitter className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Twitter</h3>
                        <p className="text-rugike-secondary text-sm">@rugikemotors</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-[#25D366] rounded-full p-2 mr-4">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">WhatsApp</h3>
                        <p className="text-rugike-secondary text-sm">+(254)7 12 345-678</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-[#FFFC00] rounded-full p-2 mr-4">
                        <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.166.33a.931.931 0 00-.332 0C9.594.586 1.5 2.586 1.5 2.586l.084.043c.999.54 1.815 1.29 3.851 1.963 2.075.687 4.496.892 5.743.252.263-.135.592-.319.919-.497 1.228-.67 2.496-1.36 3.338-.892.714.395 1.575 1.676 2.456 3.61.749 1.844 1.375 4.174.185 6.407-1.171 2.432-3.414 3.11-5.275 3.11-1.8 0-3.466-.592-4.952-1.375-2.282-1.202-4.223-2.777-5.56-3.864l-.5.734c0 .09-.054 2.289.626 4.742.596 2.148 1.82 4.602 4.42 6.341 1.31.883 2.865 1.506 4.553 1.657l-.18.077c1.798.328 3.808.215 5.648-.431 5.734-2.275 5.445-7.773 6.84-10.97.774-1.772 1.561-2.924 2.122-3.664.154-.22.273-.376.365-.49.032-.04.059-.073.082-.101.151-.18.242-.279.242-.279l.068-.123c-.205-1.426-3.396-3.144-3.764-3.362-.253-.149-.492-.312-.024-.614 1.143-.74 3.089-1.211 3.089-1.211l.136-.048-.084-.135C20.51 2.1 12.166.33 12.166.33z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Snapchat</h3>
                        <p className="text-rugike-secondary text-sm">@rugikemotors</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t">
                      <h3 className="font-semibold mb-2">Visit Us</h3>
                      <address className="not-italic text-rugike-secondary">
                        RUGIKE Motors Showroom<br />
                        123 Luxury Ave<br />
                        New York, NY 10001
                      </address>
                      <p className="mt-2 text-rugike-secondary">
                        <strong>Hours:</strong> Mon-Sat: 9am-7pm, Sun: 11am-5pm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Inquiry about..." required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message here..." className="min-h-32" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="carId">Car ID (Optional)</Label>
                      <Input id="carId" placeholder="If inquiring about a specific car, enter its ID" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="email-contact" name="contact-method" value="email" className="h-4 w-4" />
                          <label htmlFor="email-contact">Email</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="phone-contact" name="contact-method" value="phone" className="h-4 w-4" />
                          <label htmlFor="phone-contact">Phone</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="whatsapp-contact" name="contact-method" value="whatsapp" className="h-4 w-4" />
                          <label htmlFor="whatsapp-contact">WhatsApp</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-rugike-primary text-white hover:bg-rugike-dark">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
