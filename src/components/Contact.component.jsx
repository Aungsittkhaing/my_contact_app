import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EmptyLottie from "./lotieComponents/Empty.lottie";

const ContactComponent = () => {
  const [contacts, setContacts] = useState([]);

  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 py-2 px-3 shadow-lg",
      cancelButton: "bg-red-500 py-2 px-3 shadow-lg mr-4",
    },
    buttonsStyling: false,
  });
  //to get contact lists from database
  const getContacts = async () => {
    const { data } = await axios.get("http://localhost:3000/contact");
    setContacts(data);
  };
  //to remove contact data from database
  const apiDeleteContact = async (id) => {
    //sweet with delete btn
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          const { data } = await axios.delete(
            `http://localhost:3000/contact/${id}`
          );
          console.log(data);
          getContacts();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  //to show contacts with useEffect
  useEffect(() => {
    getContacts();
  }, []);
  return (
    <>
      <Link to={"/create"}>
        <div className="flex justify-end">
          <button className="bg-gray-800 text-white py-2 px-2 text-2xl rounded my-2 shadow-sm">
            <FiPlusCircle />
          </button>
        </div>
      </Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {contacts.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    {contact.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    {contact.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    {contact.phone}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800 flex gap-2"
                  >
                    <BsFillTrashFill
                      className="text-xl text-red-500 cursor-pointer"
                      onClick={() => apiDeleteContact(contact.id)}
                    />
                    <Link to={`/edit/${contact.id}`}>
                      <BsPencilSquare className="text-xl text-blue-300 cursor-pointer" />
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full bg-white h-[600px] mt-5 rounded border flex flex-col justify-center items-center">
            <EmptyLottie />
            <p className="font-semibold text-gray-400">There is no list!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactComponent;
