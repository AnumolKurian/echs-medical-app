<?php

class ConnectionClass
{
	public $db = null;
	public function open()
  { 
  	 $this->db = mysqli_connect('localhost','root','',"echs_app") or die('Error connecting to MySQL server.');
  }


  public function Manipulation($qry)
  {
    $this->open();
    //$this-db = mysqli_connect('localhost','root','','demo') or die('Error connecting to MySQL server.');
    $response =array();
   	try
	{
	
		$result=mysqli_query($this->db,$qry); 
		if($result)
		$response['Status']="true";
			 
		else
			throw new Exception(mysqli_error($this->db));	
	
	}
	catch(Exception $e)
	{
	$response['Status']="false";
	$response['Message']= $e->getMessage();
		 
	}    
	 mysqli_close($this->db);	 
	 return ($response);	 
  }
 
 public function GetTable($qry) 
 {
 $this->open();
 // $this->db = mysqli_connect('localhost','root','','collegewebsiteremake') or die('Error connecting to MySQL server.');

 	try
	{
		$result=mysqli_query($this->db,$qry);// or throw new Exception("Error in Query");
		if($result)
		{
			$data = array(); // create a variable to hold the information
			while ($row = mysqli_fetch_assoc($result)) 
			{
				$data[] = $row; // add the row in to the results (data) array
		  
			}

			return $data;
		}
		else
			throw new Exception(mysqli_error($this->db));	
	
	}
	catch(Exception $e)
	{
		return $e->getMessage();
	} 
 }
 public function GetSingleData($qry) 
 {
 $this->open();

 //$this->db = mysqli_connect('localhost','root','','collegewebsiteremake') or die('Error connecting to MySQL server.');

 	 try
	{
		$result=mysqli_query($this->db,$qry);// or throw new Exception("Error in Query");
	//	var_dump($result);
		if($result)
		{
			//$data = array(); // create a variable to hold the information
			$row = mysqli_fetch_row($result) ;
			 
			//	$data = $row; // add the row in to the results (data) array

			return  ($row)!=null ?$row[0]:"";
		}
		else
		{
			throw new Exception(mysqli_error($this->db));	
		}
	
	}
	catch(Exception $e)
	{
		return $e->getMessage();
	} 
 }
 
 public function GetSingleRow($qry) 
 {
 $this->open();
 	 try
	{
		$result=mysqli_query($this->db,$qry);// or throw new Exception("Error in Query");
		if($result)
		{
			//$data = array(); // create a variable to hold the information
			$row = mysqli_fetch_array($result) ;
			
			//	$data = $row; // add the row in to the results (data) array

			return $row;
		}
		else
			throw new Exception(mysqli_error($this->db));	
	
	}
	catch(Exception $e)
	{
		return $e->getMessage();
	} 
 }
  

 
  
  
  
  
  function alert($msg, $url=null)
  {
	 echo  "
	 <script type='text/javascript'>
alert('".$msg."');
location.href='".$url."';
</script>";


  }
  
  public function getpostedby()
	  {
	  	session_start();

	  	$username=$_SESSION['username'];
	  	return $username;

	  }

	  public function getcurtime()
	  {
	  	$date= date('Y-m-d');
	  	return $date;
	  }
}

?>