import { useEffect, useState } from "react";
import api from "../services/api";

const Company = () => {
  const [companyId, setCompanyId] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    gstNumber: "",
    panNumber: "",
    email: "",
    phone: "",
    address: "",
    invoicePrefix: "INV",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await api.get("/company");

      if (res.data.count > 0) {
        const company = res.data.companies[0];

        setCompanyId(company._id);

        setFormData({
          companyName: company.companyName,
          gstNumber: company.gstNumber,
          panNumber: company.panNumber,
          email: company.email,
          phone: company.phone,
          address: company.address,
          invoicePrefix: company.invoicePrefix,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (companyId) {
        await api.put(`/company/${companyId}`, formData);

        alert("Company updated successfully!");
      } else {
        await api.post("/company", formData);

        alert("Company created successfully!");
      }

      fetchCompany();
    } catch (err) {
      console.log(err);

      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Company Details
      </h1>

      <div className="space-y-5">

        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="panNumber"
          placeholder="PAN Number"
          value={formData.panNumber}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="email"
          placeholder="Company Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="address"
          placeholder="Company Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-32"
        />

        <input
          name="invoicePrefix"
          placeholder="Invoice Prefix"
          value={formData.invoicePrefix}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {companyId ? "Update Company" : "Save Company"}
        </button>

      </div>
    </div>
  );
};

export default Company;