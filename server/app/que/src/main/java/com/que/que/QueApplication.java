package com.que.que;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.CacheControl;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.models.OpenAPI;

@SpringBootApplication
public class QueApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(QueApplication.class, args);
	}

	@Override
	public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {

		// Register resource handler for images
		registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI().info(new io.swagger.v3.oas.models.info.Info().title("Queue Master API")
				.description("This is a sample Spring Boot RESTful")
				.version("v0.0.1"));
	}

}
