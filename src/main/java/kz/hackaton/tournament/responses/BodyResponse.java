package kz.hackaton.tournament.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.ws.rs.core.Response;

@Data
@AllArgsConstructor
public class BodyResponse {
    private String message;
    private Response.Status statusCode;
    private Object body;
}
