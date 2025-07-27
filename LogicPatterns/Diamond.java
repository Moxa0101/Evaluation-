import java.util.*;
public class Diamond {
    public static void main(String[] args) {
         Scanner sc = new Scanner(System.in);
         System.out.print("enter n: ");
        int n = sc.nextInt();
        
        for(int i=1;i<=n;i++){
            
            
            if(i==1 || i==n){
                int space=(n*n)/2;
                for(int j=1;j<=space;j++){
                    System.out.print(" ");
                }
                 System.out.print("* ");
            }
            else if(i>1 && i<n){
                int space=(n*n)/2;
                for(int j=1;j<=space/2;j++){
                    System.out.print(" ");}
                    for(int k=1;k<=(i*(i+1))/2;k++){
                        System.out.print("* ");
                    }
                
            }
           
            
          System.out.println();     
        }
    }
}
        
    

