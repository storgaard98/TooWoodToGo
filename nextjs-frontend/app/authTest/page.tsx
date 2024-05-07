export default async function AuthTest() {
  const response = await fetch("http://localhost:9000/api/protected");
  const data = await response.json();
  console.log(data);
  return (
    <main className="flex flex-col items-center pt-24 min-h-screen">
      <h1 className="text-6xl font-bold">Protected Dashboard Page</h1>
      <p className="mt-2 text-xl font-medium">
        This page should be protected so it can only be accessed by
        authenticated users.
      </p>
    </main>
  );
}
