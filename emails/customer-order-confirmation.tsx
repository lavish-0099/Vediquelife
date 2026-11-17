import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
import { Img } from "@react-email/components";

interface OrderConfirmationMailProps {
  subjectLine: string;
  name: string;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string | null;
  orderDetails?: {
    orderId: number;
    orderDate: string;
    products: {
      name: string;
      quantity: number;
      price: number;
      image: string;
      slug: string;
      int_price: number;
      taxAmount: number;
    }[];
    subTotal: number;
    totalTax: number;
    totalAmount: number;
    coupon?: string;
    discount?: number;
  };
}

const OrderConfirmationMail = ({
  subjectLine,
  name,
  currency,
  paymentMethod,
  paymentStatus,
  orderStatus,
  orderDetails = {
    orderId: 0,
    orderDate: "",
    products: [],
    totalAmount: 0,
    subTotal: 0,
    totalTax: 0,
  },
}: OrderConfirmationMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const orderLink = `${domain}/user/orders`;
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

  const grandTotal =
    currency === "INR"
      ? orderDetails.subTotal + orderDetails.totalTax
      : orderDetails.subTotal;

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
          margin: "0 auto",
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
          Dear {name}!
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
          We are delighted to inform you that your order with details as follows
          has been successfully placed:
        </p>

        {/* Order Details */}

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
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
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
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
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
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {`x${product.quantity}`}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {`${currency} ${product.price.toFixed(2)}`}
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
                    Sub Total:
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                    }}
                  >
                    {`${currency} ${orderDetails.subTotal.toFixed(2)}`}
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
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                    }}
                  >
                    {`${currency} ${orderDetails.totalTax.toFixed(2)}`}
                  </td>
                </tr>
              </>
            )}

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
                Grand Total:
              </td>
              <td
                style={{
                  padding: "10px",
                  borderTop: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                {`${currency} ${grandTotal.toFixed(2)}`}
              </td>
            </tr>
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
                  style={{
                    padding: "10px",
                    borderTop: "1px solid #ddd",
                    fontWeight: "bold",
                    color: "purple",
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
                  style={{
                    padding: "10px",
                    borderTop: "1px solid #ddd",
                    fontWeight: "bold",
                    color: "green",
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
                Total Amount:
              </td>
              <td
                style={{
                  padding: "10px",
                  borderTop: "1px solid #ddd",
                  fontWeight: "bold",
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
                style={{
                  padding: "10px",
                  borderTop: "1px solid #ddd",
                  fontWeight: "bold",
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
                style={{
                  padding: "10px",
                  borderTop: "1px solid #ddd",
                  fontWeight: "bold",
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
                style={{
                  padding: "10px",
                  textAlign: "right",
                  fontWeight: "bold",
                  borderTop: "1px solid #ddd",
                }}
              >
                {orderStatus}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <a
            href={orderLink}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#264d25",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            View Order Details
          </a>
        </div>

        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          Thank you for choosing us. If you have any questions or concerns
          regarding your order, please feel free to contact us at{" "}
          <a
            href="mailto:connect@ranfortwellness.com"
            style={{ color: "#264d25", textDecoration: "underline" }}
          >
            connect@ranfortwellness.com
          </a>
          .
        </p>

        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          We look forward to serving you again!
        </p>
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
              margin: "0",
            }}
          >
            Thank you,
          </h2>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "5px",
              color: "#555",
            }}
          >
            Team Vedique
          </h3>
        </div>
      </div>
      {/* Footer */}
      <EmailFooter />
    </div>
  );
};

export default OrderConfirmationMail;
