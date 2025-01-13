package com.que.que.Security;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.que.que.User.AppUser.AppUser;
import com.que.que.User.AppUser.AppUserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

import org.springframework.util.StringUtils;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final BusinessUserRepository businessUserRepository;
    private final AppUserRepository appUserRepository;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws SecurityException, IOException {
        // Get authorization header and validate
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.hasText(header) || !header.startsWith("Bearer ")) {
            try {
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new SecurityException("Invalid token");
            }
            return;
        }

        String token = header.split(" ")[1].trim();
        BusinessUser businessUser = businessUserRepository.findByEmail(jwtUtil.getUsername(token)).orElse(null);
        if (businessUser != null && !jwtUtil.validateToken(token, businessUser)) {
            try {
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new SecurityException("Invalid token");
            }
            return;
        }
        AppUser user = appUserRepository.findByEmail(jwtUtil.getUsername(token)).orElse(null);
        if (user != null && !jwtUtil.validateToken(token, user)) {
            try {
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new SecurityException("Invalid token");
            }
            return;
        }

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null,
                user == null ? List.of() : user.getAuthorities());

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            throw new SecurityException("Invalid token");
        }
    }
}
