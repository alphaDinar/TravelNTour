import axios from 'axios';

const Test = async () => {
  const key = "dc5d8ab51de1b1f60805961c";

  const url = `https://v6.exchangerate-api.com/v6/${key}/pair/EUR/GBP`;

  const response = await axios.get(url)
  console.log(response.data['conversion_rate'] * 3);

  return (
    <section>
    </section>
  );
}

export default Test;