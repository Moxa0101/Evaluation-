import java.util.*;
public class P23{
    public static int factorial(int n){
        int fact=1;
        for(int i=2;i<=n;i++){
             fact *= i;
         }
        return fact;
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.print("enter n:");
        int n=sc.nextInt();

        for(int i=1;i<=n;i++){
            for(int j=1;j<=i;j++){
                System.out.print(P22.factorial(j));
            }
            System.out.println();
        }
    }
}