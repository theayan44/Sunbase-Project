package com.example.sunbaseprojectbackend.controller;

import com.example.sunbaseprojectbackend.CustomException.CustomerNotFoundException;
import com.example.sunbaseprojectbackend.CustomException.EmailAlreadyExistException;
import com.example.sunbaseprojectbackend.ResponseDto.ResponseMessageDto;
import com.example.sunbaseprojectbackend.model.Customer;
import com.example.sunbaseprojectbackend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;


    @PostMapping("/add")
    public ResponseEntity addCustomer(@RequestBody Customer newCustomer){
        try {
            ResponseMessageDto response = customerService.addCustomer(newCustomer);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }catch (EmailAlreadyExistException e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }catch(Exception e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage("Internal Server Error");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/update")
    public ResponseEntity updateCustomer(@RequestBody Customer updatedCustomer){
        try {
            ResponseMessageDto response = customerService.updateCustomer(updatedCustomer);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }catch (CustomerNotFoundException e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }catch (Exception e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage("Internal Server Error");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity getAllCustomer(){
        try {
            List<Customer> response = customerService.getAllCustomer();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage("Internal Server Error");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/get/{email}")
    public ResponseEntity getCustomer(@PathVariable("email") String email){
        try {
            Customer response = customerService.getCustomer(email);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (CustomerNotFoundException e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }catch (Exception e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage("Internal Server Error");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/{email}")
    public ResponseEntity deleteCustomer(@PathVariable("email") String email){
        try {
            ResponseMessageDto response =  customerService.deleteCustomer(email);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (CustomerNotFoundException e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }catch (Exception e){
            ResponseMessageDto errorResponse = new ResponseMessageDto();
            errorResponse.setMessage("Internal Server Error");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
