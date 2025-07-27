import React, {useState,useEffect} from 'react';

export default function FetchApi(){

  const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(data => setData(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

return (
<div>
  {data.map(post => 
<p key={post.id}>{post.title}</p>)
}
</div>
);
}
