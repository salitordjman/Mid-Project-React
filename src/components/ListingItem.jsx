import { Link } from "react-router-dom";

function ListingItem({ listing, id }) {
  return (
    <li className="nav-bar-li li-item-category">
      <Link
        className="link-home links links-up-in"
        to={`/category/${listing.type}/${id}`}
      >
        <img
          className="img-categorries"
          src={listing.imgUrls[0]}
          alt={listing.name}
        />
        <div style={{ color: "#0038e0", fontSize: "20px" }}>
          <p>Condition: {listing.type}</p>
          <p>type: {listing.name}</p>
          <p>
            Price: ₪
            {listing.sale
              ? listing.discountPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            &nbsp;
            <span
              style={{
                textDecorationLine: "line-through",
              }}
            >
              {listing.sale
                ? listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""}
            </span>
          </p>
          <p> Location: {listing.location}</p>
          <p> Description: {listing.description}</p>
          <p>
            {" "}
            Time: {listing.timestamp.toDate().getDate()}/
            {listing.timestamp.toDate().getMonth() + 1}/
            {listing.timestamp.toDate().getYear() - 100}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
