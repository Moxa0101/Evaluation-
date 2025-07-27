import java.util.*;
public class P20{
    /*public static int fibbonacci(int n){
        int a=1;
        int b=1;
        for(int i=1;i<=n;i++){
            int c =a+b;
            a=b;b=c;
        }
       return a; 
    }*/
    public static void main(String[] args) {
         Scanner sc=new Scanner(System.in);
        System.out.print("enter n:");
        int n=sc.nextInt();
                int a=1;
                int b=1;
        for(int i=1;i<=n;i++){
            for(int j=1;j<=i;j++){
                
                System.out.print(a + " ");
                 int c = a+b;
                 a=b;b=c;
                 //System.out.print(c);


                //System.out.print(Pfib.fibbonacci(j));
            }
            System.out.println();
        }

        
    }
}