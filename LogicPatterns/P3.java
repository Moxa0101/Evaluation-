import java.util.Scanner;
import java.math.*;
public class P3{
 public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter n=");
        int n=sc.nextInt();

        //factorial  pattern
        int result=1;
        for( int i= 1 ; i <= 2*n ; i++){
             result*=i;  
             if(i%2 != 0){
                System.out.print(result);
             }
            System.out.print(" ");
        }
        sc.close();
    }
}