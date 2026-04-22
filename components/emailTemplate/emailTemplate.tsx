
interface EmailTemplateProps {
  firstName: string;
  code: string;
}

export function EmailTemplate({ firstName, code }: EmailTemplateProps) {
  return (
    <div className="bg-gray-100 p-6 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#5c6bc0] to-[#512da8] p-6 text-white text-center">
          <h1 className="text-xl font-semibold">
            Welcome, {firstName} 👋
          </h1>
        </div>

        {/* Body */}
        <div className="p-6 text-gray-800">
          <p className="text-base mb-4">
            Use the verification code below to continue your login:
          </p>

          {/* Code box */}
          <div className="my-6 text-center">
            <span className="inline-block bg-gray-100 px-6 py-4 text-2xl tracking-widest font-bold rounded-lg">
              {code}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            This code will expire in a few minutes. If you did not request this, you can safely ignore this email.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}