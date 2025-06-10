// src/components/FormPageLayout.jsx
export default function FormPageLayout({ title, description, children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <p className="text-white/80 text-lg">{description}</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
        {children}
        
        <div className="flex justify-between mt-12">
          <button className="px-6 py-3 bg-[#00178F]/80 hover:bg-[#00178F] text-white rounded-lg transition-all">
            Previous
          </button>
          <button className="px-6 py-3 bg-[#FFA2B6]/80 hover:bg-[#FFA2B6] text-white rounded-lg transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}