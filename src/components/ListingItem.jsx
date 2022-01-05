function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="li-item-category">
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
        <p> Phone: {listing.phone}</p>
      </div>
      <div className="categories">
        {onDelete && (
          <span
            style={{ color: "rgb(255, 58, 58)", paddingRight: "5px" }}
            className="emoji-delete-edit"
            onClick={() => onDelete(listing.id, listing.name)}
          >
            🗑
          </span>
        )}
        {onEdit && (
          <span
            style={{ color: "green", fontSize: "calc(0.8vh + 0.8vw + 16px)" }}
            className="emoji-delete-edit"
            onClick={() => onEdit(id)}
          >
            📝
          </span>
        )}
      </div>
    </li>
  );
}

export default ListingItem;
