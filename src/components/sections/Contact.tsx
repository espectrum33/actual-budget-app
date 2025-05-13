
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Facebook } from "lucide-react";

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
    <section id="contact" className="py-20 bg-recreacion-blue/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-recreacion-blue">Contáctanos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-montserrat">
            Estamos aquí para responder tus preguntas y ayudarte a crear experiencias inolvidables
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 font-comic text-recreacion-blue">Envíanos un Mensaje</h3>
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
                  className="w-full rounded-xl"
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
                  className="w-full rounded-xl"
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
                  className="w-full rounded-xl"
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
                  className="w-full rounded-xl"
                />
              </div>
              <Button
                type="submit"
                className="w-full cloud-btn bg-recreacion-green text-black font-medium py-3 px-6 rounded-xl hover:bg-recreacion-green/90 transition-all flex items-center justify-center gap-2"
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
              <h3 className="text-2xl font-bold mb-6 font-comic text-recreacion-orange">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-recreacion-pink/20 p-3 rounded-full mr-4">
                    <Phone className="text-recreacion-pink h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Teléfonos</h4>
                    <p className="text-gray-600 font-montserrat">5638221 - 4543752</p>
                    <p className="text-gray-600 font-montserrat">3115757089 - 3114824976</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-recreacion-orange/20 p-3 rounded-full mr-4">
                    <Mail className="text-recreacion-orange h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Email</h4>
                    <p className="text-gray-600 font-montserrat">eventos@recreacionymagia.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-recreacion-blue/20 p-3 rounded-full mr-4">
                    <Facebook className="text-recreacion-blue h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Facebook</h4>
                    <a 
                      href="https://www.facebook.com/recreacionymagia?fref=ts" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-recreacion-blue hover:underline font-montserrat"
                    >
                      /recreacionymagia
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <h3 className="text-2xl font-bold mb-6 font-comic text-recreacion-green">Horario de Atención</h3>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Lunes - Viernes</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sábado</span>
                    <span className="text-gray-600">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Domingo y Festivos</span>
                    <span className="text-gray-600">10:00 AM - 8:00 PM</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 italic">
                    También atendemos eventos nocturnos con previa reservación.
                  </p>
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
