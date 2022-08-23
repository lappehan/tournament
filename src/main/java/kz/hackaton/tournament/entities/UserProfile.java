//package kz.hackaton.tournament.entities;
//
//import com.vladmihalcea.hibernate.type.array.ListArrayType;
//import lombok.Getter;
//import lombok.Setter;
//import org.hibernate.annotations.Type;
//import org.hibernate.annotations.TypeDef;
//import org.hibernate.annotations.TypeDefs;
//
//import javax.persistence.*;
//import java.util.List;
//
//@Entity
//@Table(name = "user_profile")
//@Getter
//@Setter
//@TypeDefs({ @TypeDef( name = "list-array", typeClass = ListArrayType.class) })
//public class UserProfile {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Long id;
//
//    @Type(type = "list-array")
//    @Column(name = "facts",columnDefinition = "text[]")
//    private List<String> facts;
//
//    @Type(type = "list-array")
//    @Column(name = "done",columnDefinition = "text[]")
//    private List<String> done;
//
//    @OneToOne(mappedBy = "user")
//    private User user;
//}
