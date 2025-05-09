import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            <span className="bg-gradient-to-r from-gigilove-orange to-gigilove-purple bg-clip-text text-transparent">Contáctanos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-roboto">
            Estamos aquí para responder tus preguntas y ayudarte a crear experiencias inolvidables
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 font-poppins">Envíanos un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Tu número telefónico"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu evento o pregúntanos lo que necesites saber"
                  rows={4}
                  required
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gigilove-orange to-gigilove-purple text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensaje <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-6 font-poppins">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gigilove-purple/10 p-3 rounded-full mr-4">
                    <Phone className="text-gigilove-purple h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Teléfono</h4>
                    <p className="text-gray-600 font-roboto">+123 456 7890</p>
                    <p className="text-gray-600 font-roboto">+123 456 7891</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gigilove-orange/10 p-3 rounded-full mr-4">
                    <Mail className="text-gigilove-orange h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Email</h4>
                    <p className="text-gray-600 font-roboto">info@recreacionymagia.com</p>
                    <p className="text-gray-600 font-roboto">reservas@recreacionymagia.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gigilove-blue/10 p-3 rounded-full mr-4">
                    <MapPin className="text-gigilove-blue h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Ubicación</h4>
                    <p className="text-gray-600 font-roboto">Avenida Principal #123</p>
                    <p className="text-gray-600 font-roboto">Ciudad, País</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <h3 className="text-2xl font-semibold mb-6 font-poppins">Horario de Atención</h3>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Lunes - Viernes</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sábado</span>
                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Domingo</span>
                    <span className="text-gray-600">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
