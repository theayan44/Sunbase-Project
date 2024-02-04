package com.example.sunbaseprojectbackend.service;

import com.example.sunbaseprojectbackend.CustomException.CustomerNotFoundException;
import com.example.sunbaseprojectbackend.CustomException.EmailAlreadyExistException;
import com.example.sunbaseprojectbackend.ResponseDto.ResponseMessageDto;
import com.example.sunbaseprojectbackend.model.Customer;
import com.example.sunbaseprojectbackend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;


    public ResponseMessageDto addCustomer(Customer newCustomer) {
        //check for the email already exist or not
        if(customerRepository.findByEmail(newCustomer.getEmail()) != null){
            throw new EmailAlreadyExistException("Email Id already exist!");
        }

        // save the customer data in the database
        customerRepository.save(newCustomer);

        // return the success message
        ResponseMessageDto successResponse = new ResponseMessageDto();
        successResponse.setMessage("Customer added successfully");
        return successResponse;
    }


    public ResponseMessageDto updateCustomer(Customer updatedCustomer) {
        // check if the email exist or not
        if(customerRepository.findByEmail(updatedCustomer.getEmail()) == null){
            throw new CustomerNotFoundException("Sorry! Customer not found.");
        }

        // get the customer data first from the database
        Customer oldCustomer = customerRepository.findByEmail(updatedCustomer.getEmail());

        // now update the old data with new data
        oldCustomer.setFirst_name(updatedCustomer.getFirst_name());
        oldCustomer.setLast_name(updatedCustomer.getLast_name());
        oldCustomer.setAddress(updatedCustomer.getAddress());
        oldCustomer.setStreet(updatedCustomer.getStreet());
        oldCustomer.setCity(updatedCustomer.getCity());
        oldCustomer.setState(updatedCustomer.getState());
        oldCustomer.setPhone(updatedCustomer.getPhone());

        // save the updated data into the database
        customerRepository.save(oldCustomer);

        // return the success message
        ResponseMessageDto successResponse = new ResponseMessageDto();
        successResponse.setMessage("Data updated successfully");
        return successResponse;
    }


    public List<Customer> getAllCustomer() {
        // get all the data from database
        List<Customer> customerList = customerRepository.findAll();

        // sort the data alphabetically according to first name
        customerList.sort((a, b) -> {
            return a.getFirst_name().toLowerCase().compareTo(b.getFirst_name().toLowerCase());
        });

        // return the sorted list
        return customerList;
    }


    public Customer getCustomer(String email) {
        // check if the email exist or not
        if(customerRepository.findByEmail(email) == null){
            throw new CustomerNotFoundException("Sorry! Customer not found.");
        }

        // get the customer data from the database and return
        return customerRepository.findByEmail(email);
    }


    public ResponseMessageDto deleteCustomer(String email) {
        // check if the email exist or not
        if(customerRepository.findByEmail(email) == null){
            throw new CustomerNotFoundException("Sorry! Customer not found.");
        }

        // get the customer data from the database and delete
        Customer customer = customerRepository.findByEmail(email);
        customerRepository.delete(customer);

        // return the success message
        ResponseMessageDto successResponse = new ResponseMessageDto();
        successResponse.setMessage("Customer deleted successfully");
        return successResponse;
    }

}
