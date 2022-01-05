import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import ListingItem from "../components/ListingItem";

function Sale() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("sale", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="page">
      <header>
        <h2 className="pageHeader">Sale</h2>
      </header>
      {loading ? (
        <h1>Loading......</h1>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categories" style={{ padding: "0" }}>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <h1>Unfortunately empty, come back later</h1>
      )}
    </div>
  );
}

export default Sale;
