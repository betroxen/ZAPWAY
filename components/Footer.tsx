export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}