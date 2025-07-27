import java.util.*;
import java.math.*;
public class P5{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.print("enter n: ");
        int n=sc.nextInt();
        int num=1;
        for(int i=1;i<=n;i++){
           num=i;
               for(int j=1;j<=i;j++){
                
                System.out.print(num);
                num++;
                }  
                num++;
            for(int j=2*(i-1); j>=i; j--){
                
                System.out.print(j);
            }
            System.out.println();
        }
        sc.close();
    }
}