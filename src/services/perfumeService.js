const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/perfumes`

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const show = async (perfumeId) => {
  try{
    const res = await fetch(`${BASE_URL}/${perfumeId}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
    return res.json()
  }catch(err) {
    console.log(err)
  }
}

const create = async (perfumeFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(perfumeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, show, }