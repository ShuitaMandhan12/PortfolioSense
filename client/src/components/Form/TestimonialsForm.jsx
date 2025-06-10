// src/components/forms/TestimonialsForm.jsx
import { useState } from 'react';

export default function TestimonialsForm({ data, updateData, nextStep, prevStep }) {
  const [testimonials, setTestimonials] = useState(data.testimonials || [{
    name: '',
    position: '',
    company: '',
    content: '',
    avatar: null
  }]);

  const handleChange = (index, field, value) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...testimonials];
    updated[index].avatar = file;
    setTestimonials(updated);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, {
      name: '',
      position: '',
      company: '',
      content: '',
      avatar: null
    }]);
  };

  const removeTestimonial = (index) => {
    if (testimonials.length > 1) {
      setTestimonials(testimonials.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ testimonials });
    nextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#00178F] via-[#4B96FF] to-[#FFA2B6]">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] bg-clip-text text-transparent">
            Testimonials
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {testimonials.map((test, index) => (
              <div key={index} className="bg-white/10 border border-white/20 rounded-lg p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="shrink-0">
                    <label htmlFor={`avatar-${index}`} className="cursor-pointer">
                      {test.avatar ? (
                        <img 
                          src={URL.createObjectURL(test.avatar)} 
                          alt="Avatar" 
                          className="h-16 w-16 rounded-full object-cover border-2 border-white/30"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                          <span className="text-white/50 text-xs">Photo</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        id={`avatar-${index}`}
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Name*
                        </label>
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => handleChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4B96FF]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Position*
                        </label>
                        <input
                          type="text"
                          value={test.position}
                          onChange={(e) => handleChange(index, 'position', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4B96FF]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Company*
                      </label>
                      <input
                        type="text"
                        value={test.company}
                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4B96FF]"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Testimonial Content*
                  </label>
                  <textarea
                    value={test.content}
                    onChange={(e) => handleChange(index, 'content', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4B96FF]"
                    required
                  />
                </div>
                
                {testimonials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestimonial(index)}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    Remove Testimonial
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addTestimonial}
              className="flex items-center text-white/80 hover:text-white"
            >
              <span className="mr-2">+</span> Add Another Testimonial
            </button>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}