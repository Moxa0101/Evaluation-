import java.util.*;
public class P5{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        System.out.print("enter n: ");
        for(int i=1;i<=n;i++){
            for(int j=i;j>=0;j--){
                System.out.print(j);
            }
           // for(int j=i-1;j>=0;j--){
             //   System.out.print(j);
           // }
            System.out.println();
        }
    }
}