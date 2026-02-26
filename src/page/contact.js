function Contact() {
    return (
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Contact Me</h2>
          <p className="text-center text-gray-600 mb-12">
            Feel free to reach out for collaborations or just a friendly hello 👋
          </p>
  
          <div className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
  
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
  
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
  
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
  
            <div className="mt-8 text-center text-gray-700">
              <p>Email: <a href="mailto:yourname@example.com" className="text-blue-500 hover:underline">yourname@example.com</a></p>
              <p>Phone: <a href="tel:+880123456789" className="text-blue-500 hover:underline">+880 1234 56789</a></p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Contact;