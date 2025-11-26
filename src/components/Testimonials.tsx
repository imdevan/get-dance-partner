import { faker } from '@faker-js/faker';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const generateTestimonials = () => {
  return Array.from({ length: 6 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement([
      'Professional Dancer',
      'Dance Instructor',
      'Social Dancer',
      'Competition Dancer',
      'Dance Student'
    ]),
    content: faker.helpers.arrayElement([
      "This app has completely transformed how I practice. I can finally keep track of all my class videos and see my progress over time!",
      "As an instructor, I recommend this to all my students. The tagging system makes it so easy to find specific moves later.",
      "I used to have hundreds of unorganized videos. Now I can actually find what I need and practice efficiently.",
      "The note-taking feature is genius. I can add my thoughts right after class and reference them when practicing at home.",
      "Finally, an app that understands what dancers need. The organization tools are exactly what I've been looking for.",
      "Game changer for competition prep. I can tag my weak spots and focus my practice sessions strategically."
    ]),
    initials: faker.person.fullName().split(' ').map(n => n[0]).join('')
  }));
};

const Testimonials = () => {
  const testimonials = generateTestimonials();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Loved by Dancers
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          See what dancers are saying about their experience with Dance Partner
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
