import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
import { getItemPrice, getItemTaxAmount } from "@/lib/product";
import { Img } from "@react-email/components";

interface ProductItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
  slug: string;
  int_price: number;
  taxAmount: number;
  taxRate: number;
}

interface PlanItem {
  name: string;
  quantity: number;
  priceInr: number;
  priceUsd: number;
  durationDays: number;
  planType: string;
}
interface OrderDetails {
  orderId: number;
  orderDate: string;
  subTotal: number;
  totalTax?: number;
  igst?: number;
  sgst?: number;
  cgst?: number;
  totalAmount: number;
  coupon?: string;
  discount?: number;
  products?: ProductItem[];
  plans?: PlanItem[];
}
interface CustomerOrderAdminMailProps {
  subjectLine: string;
  name: string;
  currency: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  exchangeRate: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string | null;
  orderDetails: OrderDetails;
}

const CustomerOrderAdminMail = ({
  subjectLine,
  name,
  email,
  currency,
  phoneNumber,
  address,
  country,
  state,
  city,
  zip,
  orderDetails,
  paymentMethod,
  paymentStatus,
  orderStatus,
  exchangeRate,
}: CustomerOrderAdminMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "green";
      case "Cancelled":
        return "red";
      case "Failed":
        return "red";
      case "Processing":
        return "purple";
      default:
        return "black";
    }
  };
  const grandTotal = orderDetails.subTotal + orderDetails.discount!;
  return (
    <div
      style={{
        background: "#f2f2f2",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <EmailHeader domain={domain || ""} />

      {/* Main Content */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0px auto",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderBottom: "4px solid #264d25",
          borderTop: "4px solid #264d25",
          borderLeft: "1px solid #264d25",
          borderRight: "1px solid #264d25",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          Dear Admin!
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#555",
          }}
        >
          {subjectLine}
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Name:</strong> {name}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Address:</strong> {address}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Country:</strong> {country}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>State:</strong> {state}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>City:</strong> {city}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Zip Code:</strong> {zip}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Order at:</strong> {orderDetails?.orderDate}
        </p>

        {/* Order Details */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "20px",
            color: "#555",
          }}
        >
          Order Details
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Order ID:</strong> {orderDetails?.orderId}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Order Date:</strong> {orderDetails?.orderDate}
        </p>
        {/* Order Details */}
        {orderDetails.plans && orderDetails.plans.length > 0 && (
          <>
            <h3
              style={{
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Ordered Plans:
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr style={{ background: "#f2f2f2" }}>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Plan
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Duration
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.plans.map((plan, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {plan.name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {plan.durationDays >= 30
                        ? `${plan.durationDays / 30} months`
                        : `${plan.durationDays} days`}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "right",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {currency}{" "}
                      {currency === "INR"
                        ? plan.priceInr.toFixed(2)
                        : plan.priceUsd.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {orderDetails.products && orderDetails.products.length > 0 && (
          <>
            <h3
              style={{
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Ordered Products:
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
              }}
            >
              <thead>
                <tr style={{ background: "#f2f2f2" }}>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Image
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Tax
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.products.map((product, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <a href={`${domain}/product/${product.slug}`}>
                        <Img
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          style={{ borderRadius: "5px" }}
                        />
                      </a>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <a
                        href={`${domain}/product/${product.slug}`}
                        style={{
                          color: "#333",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {product.name}
                      </a>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {`x${product.quantity}`}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {`${currency} ${getItemPrice(
                        product,
                        currency,
                        exchangeRate,
                      ).toFixed(2)}`}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {`${currency} ${getItemTaxAmount(
                        product,
                        currency,
                        exchangeRate,
                      ).toFixed(2)}`}
                    </td>
                  </tr>
                ))}
                {currency === "INR" && (
                  <>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          padding: "10px",
                          textAlign: "right",
                          fontWeight: "bold",
                          borderTop: "1px solid #ddd",
                        }}
                      >
                        Base Total:
                      </td>
                      <td
                        colSpan={2}
                        style={{
                          padding: "10px",
                          borderTop: "1px solid #ddd",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        {`${currency} ${orderDetails.subTotal.toFixed(2)}`}
                      </td>
                    </tr>
                  </>
                )}

                {orderDetails?.coupon && (
                  <tr className="coupon">
                    <td
                      colSpan={3}
                      style={{
                        padding: "10px",
                        textAlign: "right",
                        fontWeight: "bold",
                        borderTop: "1px solid #ddd",
                      }}
                    >
                      Coupon
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        padding: "10px",
                        borderTop: "1px solid #ddd",
                        fontWeight: "bold",
                        color: "purple",
                        textAlign: "left",
                      }}
                    >
                      {orderDetails?.coupon}
                    </td>
                  </tr>
                )}

                {orderDetails?.discount && orderDetails.discount > 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        padding: "10px",
                        textAlign: "right",
                        fontWeight: "bold",
                        borderTop: "1px solid #ddd",
                      }}
                    >
                      Discount
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        padding: "10px",
                        borderTop: "1px solid #ddd",
                        fontWeight: "bold",
                        color: "green",
                        textAlign: "left",
                      }}
                    >
                      {`${currency} -  ${orderDetails.discount.toFixed(2)}`}
                    </td>
                  </tr>
                ) : null}

                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    Sub Total:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {`${currency} ${grandTotal.toFixed(2)}`}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    Total Tax:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {`${currency} ${orderDetails.totalTax!.toFixed(2)}`}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    Total Amount:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {`${currency} ${orderDetails.totalAmount.toFixed(2)}`}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    Payment Method:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {paymentMethod}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    Payment Status:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: getStatusColor(paymentStatus),
                    }}
                  >
                    {paymentStatus}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    Order Status:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {orderStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};

export default CustomerOrderAdminMail;
