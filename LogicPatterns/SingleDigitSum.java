import java.util.*;
import java.math.*;
public class SingleDigitSum{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.print("enter n: ");
        int n=sc.nextInt();
        int sum=0;
        int i=0;
        while(n>0){
            i=n%10;
            sum+=i;
            n=n/10;
         if(n==0 && sum>=10){
                n=sum;
                sum=0;
            
            }
        }   
        System.out.println("sum =" + sum);

     
    }
}
/*
 * while(sum>=10)
 * sum=0;
 */