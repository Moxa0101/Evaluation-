import java.util.*;
import java.math.*;
public class P7{
    public static long power(int x,int n){
        long result=1;
        for(int i=1;i<=n;i++){
            result*=x; 
        }
        return result;
    }

    public static long factorial(int n){
         long fact=1;
        for(int i=2;i<=n;i++){
            fact*=i;
        }
        return fact;
    }

    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("enter n: ");
        int n=sc.nextInt();
        System.out.print("enter x: ");
         int x=sc.nextInt();
         double result=0;
        for(int i=0;i<=n;i++)
        {
           int powval=2*i + 1;
            double term= (double) power(x,powval)/factorial(powval);
            if(i%2 == 0){
                result += term;
            }    
                else{
                     result -= term;
                }
             }
        System.out.println(result);
    }
}