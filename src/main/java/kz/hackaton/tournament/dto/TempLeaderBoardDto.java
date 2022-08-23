package kz.hackaton.tournament.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.SqlResultSetMapping;



public interface TempLeaderBoardDto {
     Long getWinner();
     Long getCount();


}
