import { ContactForm } from './ContactForm'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Pareo team'
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with our team
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
