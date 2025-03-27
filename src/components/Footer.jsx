import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-4 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div>
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Ishtiaq Uddin. All rights
            reserved.
          </p>
        </div>
        <div>
          <ul className="flex space-x-4 text-xl">
            <li>
              <Link href="#" className="text-gray-400 hover:text-purple-600">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-purple-600">
                <FaLinkedin />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
