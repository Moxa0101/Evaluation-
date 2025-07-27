import java.util.Scanner;
public class Zigzag {
    public static void main(String[] args) {
         Scanner sc=new Scanner(System.in);
         System.out.print("enter n: ");
         int n=sc.nextInt();
        int j;
         if(n==1)
         j=5;
        else
        j=(n*4)+1;
        
        for (int i = 1; i <= 3; i++) {
            for (int k = 1; k <=j; k++) {
            if( (i+k)%4 ==0 || i==2 && k%4==0)
                System.out.print("*");
                else
                System.out.print(" ");
             }
            System.out.println(" ");
        }
        sc.close();
    }
}
