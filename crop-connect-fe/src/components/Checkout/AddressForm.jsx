import React from 'react';

const AddressForm = ({ formData, handleInputChange, suggestions, handleSuggestionClick }) => {
  return (
    <form id="checkout-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="country">Country/Region</label>
      <select id="country" required>
        <option value="India" selected>India</option>
      </select>

      <label htmlFor="name">Full Name (First and Last Name)</label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="mobile">Mobile Number</label>
      <input
        type="tel"
        id="mobile"
        value={formData.mobile}
        onChange={handleInputChange}
        required
        placeholder="10-digit number"
        pattern="[0-9]{10}"
      />

      <label htmlFor="pincode">Pincode</label>
      <input
        type="text"
        id="pincode"
        value={formData.pincode}
        onChange={handleInputChange}
        required
        placeholder="6-digit PIN code"
      />

      <label htmlFor="address">Flat, House no., Building, Company, Apartment</label>
      <input
        type="text"
        id="address"
        value={formData.address}
        onChange={handleInputChange}
        required
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item.address)}>
              {item.address.label}
            </li>
          ))}
        </ul>
      )}

      <label htmlFor="area">Area, Street, Sector, Village</label>
      <input
        type="text"
        id="area"
        value={formData.area}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="landmark">Landmark</label>
      <input
        type="text"
        id="landmark"
        value={formData.landmark}
        onChange={handleInputChange}
        placeholder="E.g. near Apollo Hospital"
      />

      <label htmlFor="town">Town/City</label>
      <input
        type="text"
        id="town"
        value={formData.town}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="state">State</label>
      <select id="state" value={formData.state} onChange={handleInputChange} required>
        <option value="" disabled selected>Choose a state</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
      </select>
    </form>
  );
};

export default AddressForm;